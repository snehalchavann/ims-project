package com.ims.incident_service.service;

import com.ims.incident_service.dto.IncidentDTO;
import com.ims.incident_service.exception.IncidentNotFoundException;
import com.ims.incident_service.model.Incident;
import com.ims.incident_service.model.IncidentStatus;
import com.ims.incident_service.repository.IncidentRepository;
import com.ims.incident_service.repository.IncidentService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IncidentServiceImpl implements IncidentService {
    private final IncidentRepository incidentRepository;

    @CacheEvict(value = {
            "dashboardCache",
            "recentIncidentCache",
            "incidentCache"
    }, allEntries = true)
    @Override
    public Incident createIncident(IncidentDTO dto, String username) {
        Incident incident = new Incident();
        incident.setTitle(dto.getTitle());
        incident.setDescription(dto.getDescription());
        incident.setCreatedBy(username);
        incident.setPriority(dto.getPriority());
        incident.setStatus(IncidentStatus.OPEN);
        incident.setCreatedAt(LocalDateTime.now());
        return incidentRepository.save(incident);
    }

    @Cacheable(key = "'user_'+#username", value = "incidentCache")
    @Override
    public List<Incident> getUserIncidents(String username) {
        return incidentRepository.findByCreatedBy(username);
    }

    @Override
    public List<Incident> getAllIncidents() {
        return incidentRepository.findAll();
    }

    @CacheEvict(value = {
            "dashboardCache",
            "recentIncidentCache",
            "incidentCache"
    }, allEntries = true)
    @Override
    public Incident updateStatus(Long id, IncidentStatus status) {
        Incident incident = incidentRepository.findById(id).orElseThrow(() -> new IncidentNotFoundException("Incident" + id + " not found"));
        incident.setStatus(status);
        return incidentRepository.save(incident);
    }

    @CacheEvict(value = {
            "dashboardCache",
            "recentIncidentCache",
            "incidentCache"
    }, allEntries = true)
    @Override
    public int purgeResolvedIncidents(int noOfDays) {
        List<Incident> incidents;
        if(noOfDays == 0){
            incidents = incidentRepository.findIncidentByStatus(IncidentStatus.RESOLVED);
        }else{
            LocalDateTime oldDate = LocalDateTime.now().minusDays(noOfDays);
            incidents = incidentRepository.findIncidentByStatusAndCreatedAtBefore(IncidentStatus.RESOLVED, oldDate);
        }
        incidentRepository.deleteAll(incidents);
        return incidents.size();
    }

    @Cacheable(key = "#isAdmin ? 'admin' : #username", value = "recentIncidentCache")
    public List<Incident> getRecentIncidents(String username, boolean isAdmin){
        if(isAdmin){
            return incidentRepository.findTop5ByOrderByCreatedAtDesc();
        }else{
            return incidentRepository.findTop5ByCreatedByOrderByCreatedAtDesc(username);
        }
    }
}
