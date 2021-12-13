
namespace LocalAPIEmail;

public class EmailSender
{
    public async Task<bool> Send(EmailData email)
    {
        var sendData = Email
    .From(email.from)
    .To(email.to)
    .Subject(email.subject)
    .UsingTemplate(email.body, email.ObjectToInterpret);
        var data = await sendData.SendAsync();
        //add logging
        return data.Successful;
    }
}
