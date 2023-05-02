class AttachedPhoto {
  sizes: {url: string} [] = [];
}

class Attachment {
  type: "photo" = "photo";
  photo: AttachedPhoto = new AttachedPhoto();
}

export class WallItem {
  protected _date: number;
  protected attachments: Attachment[] = [];
  public text: string = '';
  protected id: number = 0;


  /**
   * @param rawItem
   * @internal
   */
  constructor(rawItem: {date: number, attachments: Array<Attachment>, text: string, id: number}) {
    this._date = rawItem.date;
    this.text = rawItem.text;
    this.attachments = rawItem.attachments;
    this.id = rawItem.id;
  }

  get date(): Date {
    return new Date(this._date * 1000);
  }

  get previewImg(): string {
    return this.attachments[0]?.photo.sizes[3]?.url || '';
  }

  static createFromRaw(rawItem: {date: number, attachments: Array<Attachment>, text: string, id: number}): WallItem {
    return new WallItem(rawItem);
  }

  get isPaid(){
    return this.text.indexOf('платного') > -1;
  }

  get isArt(){
    return !this.isPaid && this.text.indexOf('репост') === -1;
  }

  get link(){
    return 'https://vk.com/neuro_easel?w=wall-218089737_' + this.id;
  }
}
