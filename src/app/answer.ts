export class Answer {
  constructor (
    public text: string,
    public questionId: string, 
    public authorId: string,
    public author: string,      
    public views: number, 
    public likes: number,
    public dateCreated: string 
  ) {}
}
