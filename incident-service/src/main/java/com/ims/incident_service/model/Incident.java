package com.ims.incident_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Incident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime createdAt;
    private String createdBy;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String priority;
    @Enumerated(EnumType.STRING)
    private IncidentStatus status;
    private String title;
}
