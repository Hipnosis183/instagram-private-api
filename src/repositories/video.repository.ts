import { Repository } from '../core/repository';

export class VideoRepository extends Repository {
  public async info(video_id: string) {
    const { body } = await this.client.request.send(
      {
        url: `/tv/${video_id}/?__a=1&__d=dis`,
      },
      true,
      true,
    );
    return body.items[0];
  }
}
