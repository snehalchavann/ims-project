package com.ims.incident_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DashboardDTO {
    private long totalIncidents;
    private long totalOpenIncidents;
    private long totalResolvedIncidents;
    private long totalEscalatedIncidents;
    private long totalInProgressIncidents;
    private Map<String, Long> countByPriorityMap;
}