import { Injectable } from '@nestjs/common';
import { List } from 'linqts';
import { AuthorizationService } from '../authorization/authorization.service';

@Injectable()
export class GalleryService {

  constructor(private readonly authorizationService: AuthorizationService){
  }

  public get isLogin(): Boolean{
    return this.authorizationService.isLogin;
  }

  public get isAdmin(): Boolean{
    return this.authorizationService.isAdmin;
  }

  public async getObjectFromUrl(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  public async getAlbums(albums_count, objects_count) {
    const imgUrls = await this.getObjectFromUrl(
      'https://jsonplaceholder.typicode.com/photos',
    );

    const albums = {};
    const albumList = new List(imgUrls);

    for (let i = 1; i < albums_count; i++) {
      const album = await albumList
        .Where((albumCur) => albumCur['albumId'] == i)
        .ToArray()
        .slice(0, objects_count);
      albums[`${i}`] = album;
    }

    return albums;
  }
}
