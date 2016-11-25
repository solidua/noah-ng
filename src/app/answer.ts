export class Answer {
  constructor (
    public text: string,
    public questionId: string, 
    public authorId: string,     
    public views: number, 
    public likes: number
  ) {}
}
