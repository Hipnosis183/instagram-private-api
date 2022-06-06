import { Repository } from '../core/repository';

export class CollectionsRepository extends Repository {
  public async create(collection_name: string, media_ids?: string[]) {
    const { body } = await this.client.request.send({
      url: '/api/v1/collections/create/',
      method: 'POST',
      form: this.client.request.sign({
        name: collection_name,
        added_media_ids: media_ids ? JSON.stringify(media_ids) : undefined,
        _uuid: this.client.state.uuid,
        _uid: this.client.state.cookieUserId,
        _csrftoken: this.client.state.cookieCsrfToken,
        device_id: this.client.state.deviceId,
      }),
    });
    return body;
  }

  public async edit(collection_id: string, collection_name: string, added_ids?: string[], removed_ids?: string[]) {
    const { body } = await this.client.request.send({
      url: `/api/v1/collections/${collection_id}/edit/`,
      method: 'POST',
      form: this.client.request.sign({
        name: collection_name,
        added_media_ids: added_ids ? JSON.stringify(added_ids) : undefined,
        removed_media_ids: removed_ids ? JSON.stringify(removed_ids) : undefined,
        _uuid: this.client.state.uuid,
        _uid: this.client.state.cookieUserId,
        _csrftoken: this.client.state.cookieCsrfToken,
        device_id: this.client.state.deviceId,
      }),
    });
    return body;
  }

  public async delete(collection_id: string) {
    const { body } = await this.client.request.send({
      url: `/api/v1/collections/${collection_id}/delete/`,
      method: 'POST',
      form: this.client.request.sign({
        _uuid: this.client.state.uuid,
        _uid: this.client.state.cookieUserId,
        _csrftoken: this.client.state.cookieCsrfToken,
        device_id: this.client.state.deviceId,
      }),
    });
    return body;
  }
}
