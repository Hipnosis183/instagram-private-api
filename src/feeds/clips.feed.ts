import { Feed } from '../core/feed';
import * as SUPPORTED_CAPABILITIES from '../samples/supported-capabilities.json';

export class ClipsFeed extends Feed<any> {
  id: number | string;
  max_id?: number | string = '';

  protected set state(body: any) {}

  async request() {
    const { body } = await this.client.request.send<any>({
      url: `/api/v1/clips/user/`,
      method: 'POST',
      form: this.client.request.sign({
        target_user_id: this.id,
        page_size: 24,
        max_id: this.max_id,
        _uuid: this.client.state.uuid,
        _uid: this.client.state.cookieUserId,
        _csrftoken: this.client.state.cookieCsrfToken,
        device_id: this.client.state.deviceId,
        supported_capabilities_new: JSON.stringify(SUPPORTED_CAPABILITIES),
      }),
    });
    return body;
  }

  async items(): Promise<any> {
    const body = await this.request();
    return {
      cursor: body.paging_info.max_id,
      items: body.items
    };
  }
}
