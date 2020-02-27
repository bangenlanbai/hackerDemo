<%@ WebHandler Language="C#" Class="Login" %>

using System;
using System.Web;
using System.Web.Services;
using System.Web.SessionState;
public class Login : IHttpHandler, IRequiresSessionState
{
    [WebMethod(EnableSession = true)]
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/json";
        string username = context.Request.Params["username"];
        string pwd = context.Request.Params["password"];

        if (MySql.Login(username, pwd))
        {
            HttpContext.Current.Session["user"] = username;
            HttpContext.Current.Session["logintime"] =DateTime.Now;

            context.Response.Write("{\"error\":0,\"msg\":\"登陆成功\"}");
        }
        else
        {
            context.Response.Write("{\"error\":1,\"msg\":\"密码错误\"}");
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