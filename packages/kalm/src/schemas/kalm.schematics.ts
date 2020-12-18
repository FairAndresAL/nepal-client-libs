export const kalmTypeSchematics = {
    "https://alertlogic.com/schematics/kalm": {
        definitions:{
            queryResponse: {
                type: "object",
                properties: {
                    name: {
                        type: ["null", "string"]
                    },
                    summary: {
                        type: ["null", "string"]
                    },
                    description: {
                        type: ["null", "string"]
                    },
                    recommendations: {
                        type: ["null", "string"]
                    },
                    severity: {
                        type: ["null", "string"]
                    },
                    signatures: {
                        type: ["null", "string"]
                    },
                    telemetry: {
                        type: ["null", "string"]
                    },
                    technology: {
                        type: ["null", "string"]
                    },
                    visibility: {
                        type: ["null", "string"]
                    },
                    logs: {
                        type: ["null", "string"]
                    },
                    log_source: {
                        type: ["null", "string"]
                    },
                    threat_class: {
                        type: ["null", "string"]
                    },
                    mitre_tactic: {
                        type: ["null", "string"]
                    },
                    mitre_technique: {
                        type: ["null", "string"]
                    },
                    mitre_sub_technique: {
                        type: ["null", "string"]
                    }
                },
                required: [
                    "name",
                    "summary",
                    "description",
                    "recommendations",
                    "severity",
                    "signatures",
                    "telemetry",
                    "technology",
                    "visibility",
                    "logs",
                    "log_source",
                    "threat_class",
                    "mitre_tactic",
                    "mitre_technique",
                    "mitre_sub_technique"
                ]
            }
        }
    }
};
