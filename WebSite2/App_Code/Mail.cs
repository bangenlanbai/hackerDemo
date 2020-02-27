using MailKit.Net.Smtp;
using MimeKit;
using System;

/// <summary>
/// Mail 的摘要说明
/// </summary>
public class Mail
{
    public Mail()
    {
        //
        // TODO: 在此处添加构造函数逻辑
        //
    }
    /// <summary>
    /// 使用 qq作为发件人
    /// </summary>
    /// <param name="address"></param>
    /// <param name="title"></param>
    /// <param name="content"></param>
    /// <returns></returns>
    public static bool send(string address, string title, string content)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("BGLB.HachGame", "xxxx@qq.com"));
        message.To.Add(new MailboxAddress("HackGame用户", address));
        message.Subject = string.Format("来自Hack The Game的{0}邮件 ", title);  //邮件标题     

        message.Body = new TextPart("plain")
        {
            Text = string.Format("{0}内容：{1} ", title, content)//邮件内容。
        };
        using (var client = new SmtpClient())
        {
            // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
            client.ServerCertificateValidationCallback = (s, c, h, e) => true;
            client.Connect("smtp.qq.com", 465, true);
            // Note: only needed if the SMTP server requires authentication
            client.Authenticate("xxx@qq.com", "pwd");
            try
            {
                client.Send(message);
                client.Disconnect(true);
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }

        }

    }

    //public static void send(string address, string title, string content)
    //{
    //    var message = new MimeMessage();
    //    message.From.Add(new MailboxAddress("BGLB.HachGame", "发信人账户"));
    //    message.To.Add(new MailboxAddress("HackGame用户",address));
    //    message.Subject = string.Format("来自Hack The Game的{0}邮件 ", title);  //邮件标题     

    //    message.Body = new TextPart("plain")
    //    {
    //        Text = string.Format("{0}内容：{1} ", title, content)//邮件内容。
    //    };

    //    using (var client = new SmtpClient())
    //    {
    //        // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
    //        client.ServerCertificateValidationCallback = (s, c, h, e) => true;

    //        client.Connect("smtp.qq.com");

    //        // Note: only needed if the SMTP server requires authentication
    //        client.Authenticate("发信人账户", "pwd");
    //        try
    //        {
    //            client.Send(message);
    //        }
    //        catch (Exception)
    //        {  
    //            throw;
    //        }
    //        client.Disconnect(true);
    //    }
    //}

}
