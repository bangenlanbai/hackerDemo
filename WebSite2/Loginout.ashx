<%@ WebHandler Language="C#" Class="Loginout" %>

using System;
using System.Web;
using System.Web.Services;
using System.Web.SessionState;
public class Loginout : IHttpHandler, IReadOnlySessionState
{

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/json";
        DateTime logintime = (DateTime)HttpContext.Current.Session["logintime"];
        DateTime exitime = DateTime.Now;
        string username = HttpContext.Current.Session["user"].ToString();
        string email = MySql.Email(username, true);
        string timeSpan = timer(exitime,logintime);
        MySql.InsertLogin(username, email, logintime.ToString(), exitime.ToString(), 0, timeSpan);
    }
    private string timer(DateTime exitime,DateTime logintime)
    {TimeSpan ts = exitime - logintime;
        string day = ts.Days.ToString();
        string hours = ts.Hours.ToString();
        string minute = ts.Minutes.ToString();
        string seconds = ts.Seconds.ToString();
        string str;
        if (day != "0")
        {
            str = string.Format("{0} 天 {1} 小时 {2}分 {3}秒", day, hours, minute, seconds);
        }
        else if (hours != "0")
        {
            str = string.Format("{1} 小时 {2}分 {3}秒", day, hours, minute, seconds);

        }
        else if (minute != "0")
        {
            str = string.Format("{2}分 {3}秒", day, hours, minute, seconds);

        }
        else
        {
            str = string.Format("{3}秒", day, hours, minute, seconds);

        }
        return str;

    }
    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}