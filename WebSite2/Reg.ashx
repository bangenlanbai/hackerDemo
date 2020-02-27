<%@ WebHandler Language="C#" Class="Reg" %>

using System;
using System.Web;

public class Reg : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/json";
        string username = context.Request.Params["username"];
        string email = context.Request.Params["email"];
        string pwd = context.Request.Params["password"];
        string yzm = context.Request.Params["yzm"];
        if (yzm.Trim() == Validate.result)
        {
            bool s = MySql.Reg(username);
            if (s)
            {
                context.Response.Write("{\"error\":1,\"msg\":\"用户名已注册，请登陆\"}");
            }
            else
            {
                s = MySql.Reg(username, pwd, email);
                if (s)
                {
                    context.Response.Write("{\"error\":0,\"msg\":\"注册成功\"}");
                }
                else
                {
                    context.Response.Write("{\"error\":1,\"msg\":\"未知错误，请刷新页面重新提交\"}");
                }
            }


        }
        else
        {
            context.Response.Write("{\"error\":1,\"msg\":\"验证码错误\"}");
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