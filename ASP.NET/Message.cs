public class ChatMessage
{
    private static int idCounter = 0;

    public int Id { get; set; }
    public string Content { get; set; }
    public DateTime SentDateTime { get; set; }
    public string UserName { get; set; }

    public ChatMessage(string content, string userName)
    {
        this.Id = idCounter++;
        this.SentDateTime = DateTime.Now;
        this.Content = content;
        this.UserName = userName;
    }
}