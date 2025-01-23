import { Request, Response } from 'express';
import { StateService } from '../services/StateService';

export class StateController {
    private stateService: StateService;
    
    constructor(stateService: StateService) {
        this.stateService = stateService;
    }
    
    async createState(req: Request, res: Response): Promise<void> {
        try {
            const { projectId, comments, photos, location, captureDate, userId } = req.body;
            const newState = await this.stateService.createState({ projectId, comments, photos, location, captureDate, userId });
            res.status(201).json(newState);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al agregar el miembro' });
        }
    }

    async updateState(req: Request, res: Response): Promise<void> {
        try {
            const { stateId } = req.params;
            const { comments, photos, location, captureDate } = req.body;
            
            const updatedMember = await this.stateService.updateState(stateId, { comments, photos, location, captureDate });
            
            res.status(200).json(updatedMember);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar el rol del miembro' });
        }    
    }

    async getState(req: Request, res: Response): Promise<void> {
        try {
            const { stateId } = req.params;
            
            const updatedMember = await this.stateService.getStateById(stateId);
            
            res.status(200).json(updatedMember);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar el rol del miembro' });
        }
    }

    async getAllStates(req: Request, res: Response): Promise<void> {
        try {
            const states = await this.stateService.getAllStates();
            
            res.status(200).json(states);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar el rol del miembro' });
        }
    }
}