package com.ims.incident_service.controller;

import com.ims.incident_service.dto.IncidentDTO;
import com.ims.incident_service.model.Incident;
import com.ims.incident_service.model.IncidentStatus;
import com.ims.incident_service.repository.IncidentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/incidents")
public class IncidentController {

    private final IncidentService incidentService;

    @PostMapping
    public ResponseEntity<?> createIncident(@Valid @RequestBody IncidentDTO incidentDTO, BindingResult result, Authentication authentication) {
        if(result.hasErrors()){
            List<String> errors = result.getFieldErrors().stream()
                    .map(ObjectError::getDefaultMessage).toList();
            return ResponseEntity.badRequest().body(errors);
        }
        Incident incident = incidentService.createIncident(incidentDTO, authentication.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(incident);
    }

    @GetMapping
    public ResponseEntity<List<Incident>> getAllIncidents(Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        List<Incident> result = isAdmin
                ? this.incidentService.getAllIncidents()
                : incidentService.getUserIncidents(authentication.getName());
        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam String status){
        if (!IncidentStatus.isValid(status)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid status value.");
        }
        Incident incident = incidentService.updateStatus(id, IncidentStatus.valueOf(status));
        return ResponseEntity.ok(incident);
    }

    @DeleteMapping("/purge")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> purge() {
        int noOfPurgedIncidents = incidentService.purgeResolvedIncidents();
        return ResponseEntity.ok("Purged " + noOfPurgedIncidents  + " resolved incidents.");
    }

    @GetMapping("/recentIncidents")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<Incident>> getRecentIncidents(Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        List<Incident> recentIncidents = incidentService.getRecentIncidents(authentication.getName(), isAdmin);
        return ResponseEntity.ok(recentIncidents);
    }
}
