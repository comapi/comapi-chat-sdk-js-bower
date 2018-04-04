import { IFoundation, ISession } from "@comapi/sdk-js-foundation";
import { IComapiChatConfig } from "./interfaces";
export declare class SessionService {
    private _foundation;
    private _config;
    /**
     * SessionService class constructor.
     * @class SessionService
     * @classdesc SessionService Class
     */
    constructor(_foundation: IFoundation, _config: IComapiChatConfig);
    /**
     * Method to start a session
     * @method SessionService#startSession
     * @returns {Promise} - Returns a promise
     */
    startSession(): Promise<ISession>;
    /**
     * Method to get the active session
     * @method SessionService#session
     * @returns {ISession} - Returns a session
     */
    readonly session: ISession;
    /**
     * Method to end a session
     * @method SessionService#endSession
     * @returns {Promise} - Returns a promise
     */
    endSession(): Promise<boolean>;
}
