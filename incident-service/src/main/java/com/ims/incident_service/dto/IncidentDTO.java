package com.ims.incident_service.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class IncidentDTO {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @Pattern(regexp = "LOW | MEDIUM | HIGH", message = "Priority should be LOW, MEDIUM or HIGH")
    private String priority;
}
