package com.ims.incident_service.repository;

import com.ims.incident_service.model.Incident;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IncidentRepository extends JpaRepository<Incident, Long> {
    List<Incident> findByCreatedBy(String username);

}
