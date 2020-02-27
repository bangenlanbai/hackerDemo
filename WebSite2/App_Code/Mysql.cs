
using System;
using System.Configuration;
using System.Data.SqlClient;

/// <summary>
/// Mysql 的摘要说明
/// </summary>
public class MySql
{
    private static readonly string connStr = ConfigurationManager.ConnectionStrings["Connection"].ToString();
    public static bool Login(string user, string pwd)
    {
        SqlParameter[] parameters = {
            new SqlParameter("@user",user),
            new SqlParameter("@pwd",pwd),
};
        bool s = true;
        string sqlStr = string.Format("SELECT count(1) FROM users WHERE username =@user and password=@pwd");
        if ((int)DBHelper.ExecuteScalar(sqlStr, System.Data.CommandType.Text, parameters) != 1)
        {
            s = !s;
        }
        return s;
    }
    /// <summary>
    /// 传入user 查询email
    /// </summary>
    /// <param name="str">参数值，user或者 email</param>
    /// <param name="value">value为true 传入user值 value为false 传入email</param>
    /// <returns>查询的email</returns>
    public static string Email(string str, bool value)
    {
        string email;
        SqlParameter parameter = new SqlParameter("@str", str );
        string sqlStr;
        if (value)
        {
            sqlStr = string.Format("SELECT email FROM users WHERE username =@str");
        }
        else
        {
           sqlStr = string.Format("SELECT count(1) FROM users WHERE email =@str");
        }
        email = DBHelper.ExecuteScalar(sqlStr, System.Data.CommandType.Text, parameter).ToString();
        return email;
    }
    public static bool Reg(string user)
    {
        bool s = false;
        SqlParameter parameters = new SqlParameter("@user", user);
            string sqlStr = string.Format("SELECT count(1) FROM users WHERE username =@user");
            if (DBHelper.ExecuteScalar(sqlStr,System.Data.CommandType.Text,parameters).ToString() == "1")
            {
                s = !s;
            }
        return s;
    }
    public static bool Reg(string user, string pwd, string email, string isadmin = "", string islogin = "")
    {
        SqlParameter[] parameters = { new SqlParameter("@user", user), new SqlParameter("@pwd", pwd), new SqlParameter("@email", email) };
        string sqlUp = string.Format("insert into users(username,password,email) values( @user,@pwd,@email)");
        if (DBHelper.ExecuteNonQuery(sqlUp, System.Data.CommandType.Text, parameters) != 1)
        {
            return true;
        }

        return false;
    }
    public static void InsertLogin(string loginUserName, string email, string loginTime, string exitTime, int TaskCount, string timer)
    {
        SqlParameter[] parameters = {
            new SqlParameter("@loginUserName", loginUserName),
            new SqlParameter("@email", email),
            new SqlParameter("@loginTime", loginTime),
            new SqlParameter("@exitTime", exitTime),
            new SqlParameter("@TaskCount", TaskCount),
            new SqlParameter("@timer", timer),
        };
        string sqlStr = string.Format("insert into login values(@loginUserName,@email,@loginTime,@exitTime,@TaskCount,@timer);update users set isLogin = '0'  WHERE username =@loginUserName");
        DBHelper.ExecuteNonQuery(sqlStr,System.Data.CommandType.Text,parameters);
    }



}
