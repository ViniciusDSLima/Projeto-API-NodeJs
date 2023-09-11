import { Request, Response } from 'express';
import UpdateUserAvatarService from '@modules/Users/services/UpdateUserAvatarService';
import { instanceToInstance } from 'class-transformer';


export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response | undefined> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file?.filename,
    });

    return response.json(instanceToInstance(user));
  }
}