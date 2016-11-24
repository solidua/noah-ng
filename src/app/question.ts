export class Question {
  constructor (
    public text: string, 
    public verseId: string,
    public authorId: string,
    public likes: number,
    public views: number
  ){}
}