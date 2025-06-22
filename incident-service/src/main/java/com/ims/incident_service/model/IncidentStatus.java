package com.ims.incident_service.model;

public enum IncidentStatus {
    OPEN,
    RESOLVED,
    ESCALATED,
    IN_PROGRESS;

    //Method to verify if the input status is valid or not
    public static boolean isValid(String status) {
        for (IncidentStatus s : IncidentStatus.values()) {
            if (s.name().equalsIgnoreCase(status)) {
                return true;
            }
        }
        return false;
    }

}
