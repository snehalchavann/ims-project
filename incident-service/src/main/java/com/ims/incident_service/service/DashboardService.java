package com.ims.incident_service.service;

import com.ims.incident_service.dto.DashboardDTO;
import com.ims.incident_service.model.Incident;
import com.ims.incident_service.model.IncidentStatus;
import com.ims.incident_service.repository.IncidentRepository;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DashboardService {
    private final IncidentRepository incidentRepository;

    @Cacheable(key = "'admin'", value = "dashboardCache")
    public DashboardDTO getDashBoardMetrics(){
        long totalIncidents = incidentRepository.count();
        long totalEscalatedIncidents = incidentRepository.countByStatus(IncidentStatus.valueOf("ESCALATED"));
        long totalInProgressIncidents = incidentRepository.countByStatus(IncidentStatus.valueOf("IN_PROGRESS"));
        long totalOpenIncidents = incidentRepository.countByStatus(IncidentStatus.valueOf("OPEN"));
        long totalResolvedIncidents = incidentRepository.countByStatus(IncidentStatus.valueOf("RESOLVED"));

        Map<String, Long> priorityCountMap = incidentRepository.findAll().stream().collect(Collectors.groupingBy(Incident::getPriority, Collectors.counting()));

        return new DashboardDTO(totalIncidents, totalOpenIncidents, totalResolvedIncidents,totalEscalatedIncidents, totalInProgressIncidents, priorityCountMap);
    }

    @Cacheable(key = "#username", value = "dashboardCache")
    public DashboardDTO getUserDashboardMetrics(String username){
        List<Incident> userIncidentList = incidentRepository.findByCreatedBy(username);

        long totalIncidents = userIncidentList.size();
        long totalEscalatedIncidents = userIncidentList.stream().filter(i -> i.getStatus().name().equalsIgnoreCase("ESCALATED")).count();
        long totalInProgressIncidents = userIncidentList.stream().filter(i -> i.getStatus().name().equalsIgnoreCase("IN_PROGRESS")).count();
        long totalOpenIncidents = userIncidentList.stream().filter(i -> i.getStatus().name().equalsIgnoreCase("OPEN")).count();
        long totalResolvedIncidents = userIncidentList.stream().filter(i -> i.getStatus().name().equalsIgnoreCase("RESOLVED")).count();

        Map<String, Long> priorityCountMap = userIncidentList.stream().collect(Collectors.groupingBy(Incident::getPriority, Collectors.counting()));

        return new DashboardDTO(totalIncidents, totalOpenIncidents, totalResolvedIncidents,totalEscalatedIncidents, totalInProgressIncidents, priorityCountMap);
    }
}