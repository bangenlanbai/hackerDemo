<%@ WebHandler Language="C#" Class="AjaxValidate" %>


using System.Web;
public class AjaxValidate : IHttpHandler
{

    private static string email = "";
    public void ProcessRequest(HttpContext context)
    {
        if (context.Request.Params["field"] != null && context.Request.Params["value"] != null)
        {
            context.Response.ContentType = "text/json";
            string field = context.Request.Params["field"].ToString();
            switch (field)
            {
                case "username":
                    string name = context.Request.Params["value"].ToString();

                    if (MySql.Reg(name))
                    {

                        context.Response.Write("{\"error\":1,\"msg\":\"用户名重复！\"}");

                    }
                    else
                    {
                        context.Response.Write("{\"error\":0,\"msg\":\"\"}");
                    }
                    break;
                case "email":

                    email = HttpUtility.UrlDecode(context.Request.Params["value"]);//解码%40转为@

                    if (MySql.Email(email,false) ==email)
                    {
                        context.Response.Write("{\"error\":1,\"msg\":\"邮箱重复！\"}");
                    }
                    else
                    {
                        context.Response.Write("{\"error\":0,\"msg\":\"\"}");
                    }
                    break;
                case "get":
                    if (email != "")
                    {
                        string a = Validate.CreateValidateCode(6, true);
                        bool issend = Mail.send(email, "注册验证码", a);
                        if (issend)
                        {
                            context.Response.Write("{\"error\":0,\"msg\":\"发送成功，请在您的邮箱内查询\"}");
                        }
                        else
                        {
                            context.Response.Write("{\"error\":1,\"msg\":\"发送失败，请重试\"}");
                        }

                    }
                    else
                    {
                        context.Response.Write("{\"error\":,\"msg\":\"邮箱地址错误\"}");
                    }
                    break;
                default:
                    context.Response.Write("{\"error\":1,\"msg\":\"缺少输入参数！\"}");
                    break;
            }
        }
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}