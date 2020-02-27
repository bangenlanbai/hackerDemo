<%@ WebHandler Language="C#" Class="Hacker" %>

using System;
using System.Web;
using System.Web.Services;
using System.Web.SessionState;
public class  Hacker : IHttpHandler, IReadOnlySessionState
{
    [WebMethod(EnableSession = true)]
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/json";
        if (HttpContext.Current.Session["user"] == null)
        {

            context.Response.Write("{\"error\":1,\"msg\":\"未登陆，请登陆\"}");
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