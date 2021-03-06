/**
 * Responder API client
 */
import {
    AlApiClient,
    AlDefaultClient,
    AlLocation
} from '@al/core';
import {
    AlResponderPlaybook,
    AlResponderAction,
    AlResponderExecution,
    AlResponderExecutions,
    AlResponderInspectorError,
    AlResponderExecutionResult,
    AlResponderExecutionQueryParams,
    AlResponderSchema,
    AlResponderExecutionsHistoryResult,
    AlResponderExecutionsHistoryQueryParams,
    AlResponderExecutionRequest,
    AlResponderInquiries,
    AlResponderInquiry,
    AlResponderSchedule,
    AlResponderInquiriesHistoryQueryParams
} from './types';

export class AlResponderClientInstance {

    protected client: AlApiClient;
    protected serviceVersion = 'v1';
    protected serviceStack = AlLocation.ResponderAPI;

    constructor(client: AlApiClient = null) {
        this.client = client || AlDefaultClient;
    }

    /**
     * List all playbooks
     * GET
     * /v1/{account_id}/playbooks
     * https://responder.mdr.global.alertlogic.com
     *
     * @param accountId AIMS Account ID
     * @returns Playbook list
     *
     * @remarks
     *
     * */
    async getPlaybooks(accountId: string) {
        return this.client.get<AlResponderPlaybook[]>({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/playbooks`
        });
    }

    /**
     * Get Playbook by id or name
     * GET
     * /v1/{account_id}/playbooks/{id}
     * https://responder.mdr.global.alertlogic.com
     *
     * @param accountId AIMS Account ID
     * @param id Playbook ID or Playbook Name
     * @returns an existing playbook
     *
     * @remarks
     *
     * */
    async getPlaybookById(accountId: string, id: string): Promise<AlResponderPlaybook> {
        return this.client.get<AlResponderPlaybook>({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/playbooks/${id}`
        });
    }

    /**
     * Create a new playbook
     * POST
     * /v1/{account_id}/playbooks
     *
     * @param accountId AIMS Account ID
     * @param payload
     * @returns a promise with the new playbook
     *
     * @remarks
     */
    async createPlaybook(accountId: string,
        payload: AlResponderPlaybook): Promise<AlResponderPlaybook> {
        return this.client.post<AlResponderPlaybook>({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/playbooks`,
            data: payload
        });
    }

    /**
     * Update existing playbook
     * PUT
     * /v1/{account_id}/playbooks/{id}
     *
     * @param accountId AIMS Account ID
     * @param id Playbook ID or Playbook Name
     * @param payload
     * @returns a promise with the updated playbook
     *
     * @remarks
     */
    async updatePlaybook(accountId: string,
        id: string,
        payload: AlResponderPlaybook): Promise<AlResponderPlaybook> {

        return this.client.put<AlResponderPlaybook>({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/playbooks/${id}`,
            data: payload
        });
    }

    /**
     * Delete existing playbook
     * DELETE
     * /v1/{account_id}/playbooks/{id}
     *
     * @param accountId AIMS Account ID
     * @param id Playbook ID or Playbook Name
     * @returns just the status code 204, 403, 404
     *
     * @remarks
     */
    async deletePlaybookById(accountId: string, id: string) {
        const result = await this.client.delete({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/playbooks/${id}`
        });
        return result;
    }


    /**
     * List actions
     * GET
     * /v1/{account_id}/actions
     * https://responder.mdr.global.alertlogic.com
     *
     * @param accountId AIMS Account ID
     * @param params
     * @returns Actions list
     *
     * @remarks
     *
     * */
    async getActions(accountId: string, params?: { payload_type: string }) {
        return this.client.get<AlResponderAction[]>({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/actions`,
            params: params
        });
    }

    /**
     * List execution
     * GET
     * /v1/{account_id}/executions
     * https://responder.mdr.global.alertlogic.com
     *
     * @param accountId AIMS Account ID
     * @returns Executions list
     *
     * @remarks
     *
     * */
    async getExecutions(accountId: string, params: AlResponderExecutionQueryParams): Promise<AlResponderExecutions> {
        return this.client.get<AlResponderExecutions>({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/executions`,
            params: params
        });
    }

    /**
     * Execute specified playbook
     * POST
     * /v1/{account_id}/executions
     *
     * @param accountId AIMS Account ID
     * @param payload
     * @returns a promise with the execution record
     *
     * @remarks
     */
    async createExecution(accountId: string,
        payload: AlResponderExecutionRequest): Promise<AlResponderExecutions> {
        return this.client.post<AlResponderExecutions>({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/executions`,
            data: payload
        });
    }

    /**
     * GET
     * /v1/{account_id}/executions/{id}/result
     * https://responder.mdr.global.alertlogic.com
     *
     * @param accountId AIMS Account ID
     * @param executionId Execution Id
     * @returns Execution result
     *
     * @remarks
     *
     * */
    async getExecutionResult(accountId: string, executionId: string): Promise<AlResponderExecutionResult> {
        return this.client.get<AlResponderExecutionResult>({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/executions/${executionId}`,
        });
    }

    /**
     * GET
     * /v1/{account_id}/executions/history
     * https://responder.mdr.global.alertlogic.com
     *
     * @param accountId AIMS Account ID
     * @param params AlResponderExecutionQueryParams params
     * @returns Execution history list
     *
     * @remarks
     *
     * */
    async getExecutionsHistory(accountId: string, payload: AlResponderExecutionQueryParams): Promise<AlResponderExecutionsHistoryResult> {
        return this.client.post<AlResponderExecutionsHistoryResult>({
            data: payload,
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/executions/history`
        });
    }

    /**
     * Re-run previosly executed playbook, Creates a new exection from a previously run exection.
     * POST
     * /v1/{account_id}/executions/{execution_id}/re_run
     *
     * @param accountId AIMS Account ID
     * @param executionId Execution Id
     * @param payload delay How long (in milliseconds) to delay the execution before scheduling
     * @returns a promise with the new execution
     *
     * @remarks
     */
    async reRunExecution(accountId: string,
        executionId: string,
        payload: {
            delay: number;
        }): Promise<AlResponderExecution> {
        return this.client.post<AlResponderExecution>({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/executions/${executionId}/re_run`,
            data: payload
        });
    }

    /**
     * Pauses running execution
     * POST
     * /v1/{account_id}/executions/{execution_id}/pause
     *
     * @param accountId AIMS Account ID
     * @param executionId Execution Id
     * @returns a promise with the 204 or 404
     *
     * @remarks
     */
    async pauseExecution(accountId: string,
        executionId: string): Promise<void> {
        return this.client.post<void>({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/executions/${executionId}/pause`,
        });
    }


    /**
     * Resumes paused execution
     * POST
     * /v1/{account_id}/executions/{execution_id}/resume
     *
     * @param accountId AIMS Account ID
     * @param executionId Execution Id
     * @returns a promise with the 204 or 404
     *
     * @remarks
     */
    async resumeExecution(accountId: string,
        executionId: string): Promise<void> {
        return this.client.post<void>({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/executions/${executionId}/resume`,
        });
    }

    /**
     * Cancels Execution
     * DELETE
     * /v1/{account_id}/executions/{execution_id}
     *
     * @param accountId AIMS Account ID
     * @param id Execution_id
     * @returns just the status code 204, 403, 404
     *
     * @remarks
     */
    async deleteExecutionById(accountId: string, id: string):Promise<void> {
        return await this.client.delete({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/executions/${id}`
        });
    }

    /**
     * Checks workflow document and returns a list of errors if any are found
     * POST
     * /v1/{account_id}/workflow/inspect
     *
     * @param accountId AIMS Account ID
     * @param payload
     * @returns a promise with the new playbook
     *
     * @remarks
     */
    async inspectWorkflow(accountId: string,
        payload: {
            input_type: 'yaml' | 'json';
            workflow: any
        }): Promise<AlResponderInspectorError[]> {
        return this.client.post<AlResponderInspectorError[]>({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/workflow/inspect`,
            data: payload
        });
    }

    /**
     * Get schemas for customer
     * GET
     * /v1/{account_id}/schemas
     * https://responder.mdr.global.alertlogic.com
     *
     * @param accountId AIMS Account ID
     * @returns Schemas
     *
     * @remarks
     *
     * */
    async getSchema(accountId: string): Promise<AlResponderSchema[]> {
        return this.client.get<AlResponderSchema[]>({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/schemas`,
        });
    }

    /**
     * Get schemas by type
     * GET
     * /v1/{account_id}/schemas/{data_type}
     * https://responder.mdr.global.alertlogic.com
     *
     * @param accountId AIMS Account ID
     * @param dataType Data type name to return JSON schema for
     * @returns Schema Detail
     *
     * @remarks
     *
     * */
    async getSchemaByType(accountId: string, dataType: string): Promise<AlResponderSchema> {
        return this.client.get<AlResponderSchema>({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/schemas/${dataType}`,
        });
    }

    /**
     * Get inquiries by account
     * GET
     * /v1/{account_id}/inquiries
     * https://responder.mdr.global.alertlogic.com
     *
     * @param accountId AIMS Account ID
     * @returns Inquiries list
     *
     * @remarks
     *
     * */
    async getInquiries(accountId: string): Promise<AlResponderInquiries> {
        return this.client.get<AlResponderInquiries>({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/inquiries`,
        });
    }

    /**
     * Get inquiries history by account
     * GET
     * /v1/{account_id}/inquiries/history
     * https://responder.mdr.global.alertlogic.com
     *
     * @param accountId AIMS Account ID
     * @returns Inquiries list
     *
     * @remarks
     *
     * */
    async getInquiriesHistory(accountId: string, request: AlResponderExecutionQueryParams): Promise<AlResponderInquiries> {
        return this.client.post<AlResponderInquiries>({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/inquiries/history`,
            data: request
        });
    }

    /**
     * Returns a specific inquiry
     * GET
     * /v1/{account_id}/inquiries
     * https://responder.mdr.global.alertlogic.com
     *
     * @param accountId AIMS Account ID
     * @param inquiryId Inquiry Id
     * @returns Inquiries list
     *
     * @remarks
     *
     * */
    async getInquiry(accountId: string, inquiryId: string): Promise<AlResponderInquiry> {
        return this.client.get<AlResponderInquiry>({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/inquiries/${inquiryId}`,
        });
    }

    /**
     * Update existing inquiry
     * PUT
     * /v1/{account_id}/inquiries
     * https://responder.mdr.global.alertlogic.com
     *
     * @param accountId AIMS Account ID
     * @returns Inquiry
     *
     * @remarks
     *
     * */
    async updateInquiry(
        accountId: string,
        inquiryId: string,
        payload: { [key: string]: unknown })
        : Promise<{ id: string; response: { [key: string]: unknown } }> {
        return this.client.put<{ id: string; response: { [key: string]: unknown } }>({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/inquiries/${inquiryId}`,
            data: payload
        });
    }

    /**
     * Get schedules by account
     * GET
     * /v1/{account_id}/schedules
     * https://responder.mdr.global.alertlogic.com
     *
     * @param accountId AIMS Account ID
     * @returns Schedules list
     *
     * @remarks
     *
     * */
    async getSchedules(accountId: string): Promise<AlResponderSchedule[]> {
        return this.client.get<AlResponderSchedule[]>({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/schedules`,
        });
    }

    /**
     * Create a new schedule
     * POST
     * /v1/{account_id}/schedules
     *
     * @param accountId AIMS Account ID
     * @param schedule
     * @returns a promise with the new schedule
     *
     * @remarks
     */
    async createSchedule(accountId: string,
        payload: AlResponderSchedule): Promise<AlResponderSchedule> {
        return this.client.post<AlResponderSchedule>({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/schedules`,
            data: payload
        });
    }

    /**
     * Deletes existing schedule
     * DELETE
     * /v1/{account_id}/schedules/{id}
     *
     * @param accountId AIMS Account ID
     * @param id Schedules ID
     * @returns just the status code 204, 403, 404
     *
     * @remarks
     */
    async deleteScheduleById(accountId: string, id: string) {
        const result = await this.client.delete({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/schedules/${id}`
        });
        return result;
    }

    /**
    * Update existing Schedule
    * PUT
    * /v1/{account_id}/schedules/{id}
    *
    * @param accountId AIMS Account ID
    * @param id Schedule id
    * @param payload
    * @returns a promise with the updated schedule
    *
    * @remarks
    */
    async updateSchedule(accountId: string,
        id: string,
        payload: AlResponderSchedule): Promise<AlResponderSchedule> {
        return this.client.put<AlResponderSchedule>({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/schedules/${id}`,
            data: payload
        });
    }

    /**
     * Get Schedule by id
     * GET
     * /v1/{account_id}/schedules/{id}
     * https://responder.mdr.global.alertlogic.com
     *
     * @param accountId AIMS Account ID
     * @param id Schedule ID
     * @returns an existing schedule
     *
     * @remarks
     *
     * */
    async getScheduleById(accountId: string, id: string): Promise<AlResponderSchedule> {
        return this.client.get<AlResponderSchedule>({
            version: this.serviceVersion,
            service_stack: this.serviceStack,
            account_id: accountId,
            path: `/schedules/${id}`
        });
    }
}
