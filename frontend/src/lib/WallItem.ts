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


  /**
   * @param rawItem
   * @internal
   */
  constructor(rawItem: {date: number, attachments: [], text: ''}) {
    this._date = rawItem.date;
    this.text = rawItem.text;
    this.attachments = rawItem.attachments;
  }

  get date(): Date {
    return new Date(this._date * 1000);
  }

  get previewImg(): string {
    return this.attachments[0]?.photo.sizes[3]?.url || '';
  }

  static createFromRaw(rawItem: {date: number, attachments: [], text: ''}): WallItem {
    return new WallItem(rawItem);
  }

  get isPaid(){
    return this.text.indexOf('платного') > -1;
  }

  get isArt(){
    return !this.isPaid && this.text.indexOf('репост') === -1;
  }
}
