package com.ims.incident_service.repository;

import com.ims.incident_service.dto.IncidentDTO;
import com.ims.incident_service.model.Incident;
import com.ims.incident_service.model.IncidentStatus;

import java.util.List;

public interface IncidentService {
    Incident createIncident(IncidentDTO dto, String username);
    List<Incident> getUserIncidents(String username);
    List<Incident> getAllIncidents();
    Incident updateStatus(Long id, IncidentStatus status);
    int purgeResolvedIncidents(int noOfDays);
    List<Incident> getRecentIncidents(String username, boolean isAdmin);
}
