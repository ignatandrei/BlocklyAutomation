
namespace LocalAPIEmail;

public class EmailSender
{
    private readonly IFluentEmail email;

    public EmailSender(IFluentEmail email)
    {
        this.email = email;
    }
    public async Task<bool> Send(EmailData emaildata)
    {
        if (emaildata == null)
            return false;
        ;
        var e = email;
        if (!string.IsNullOrWhiteSpace(emaildata.from))
            e = e.SetFrom(emaildata.from);
        e = e
        .To(emaildata.to)
        .Subject(emaildata.subject)
        .UsingTemplate(emaildata.body, emaildata.ObjectToInterpret);
        
        var data = await e.SendAsync();
        //add logging
        return data.Successful;
    }
}
