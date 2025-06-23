package com.ims.incident_service.repository;

import com.ims.incident_service.model.Incident;
import com.ims.incident_service.model.IncidentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface IncidentRepository extends JpaRepository<Incident, Long> {
    List<Incident> findByCreatedBy(String username);

    long countByStatus(IncidentStatus status);

    List<Incident> findTop5ByOrderByCreatedAtDesc();

    List<Incident> findTop5ByCreatedByOrderByCreatedAtDesc(String username);

    List<Incident> findIncidentByStatusAndCreatedAtBefore(IncidentStatus status, LocalDateTime date);

    List<Incident> findIncidentByStatus(IncidentStatus status);
}
