package com.ims.incident_service.service;

import com.ims.incident_service.dto.IncidentDTO;
import com.ims.incident_service.exception.IncidentNotFoundException;
import com.ims.incident_service.model.Incident;
import com.ims.incident_service.model.IncidentStatus;
import com.ims.incident_service.repository.IncidentRepository;
import com.ims.incident_service.repository.IncidentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IncidentServiceImpl implements IncidentService {
    private final IncidentRepository incidentRepository;

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

    @Override
    public List<Incident> getUserIncidents(String username) {
        return incidentRepository.findByCreatedBy(username);
    }

    @Override
    public List<Incident> getAllIncidents() {
        return incidentRepository.findAll();
    }

    @Override
    public Incident updateStatus(Long id, IncidentStatus status) {
        Incident incident = incidentRepository.findById(id).orElseThrow(() -> new IncidentNotFoundException("Incident" + id + " not found"));
        incident.setStatus(status);
        return incidentRepository.save(incident);
    }

    @Override
    public int purgeResolvedIncidents() {
        List<Incident> incidents = incidentRepository.findAll().stream()
                .filter(incident -> incident.getStatus().equals(IncidentStatus.RESOLVED)).toList();
        incidentRepository.deleteAll(incidents);
        return incidents.size();
    }
}
