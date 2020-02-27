using System.Configuration;
using System.Data;
using System.Data.SqlClient;

/** DBHelper 2012的sqlserver数据库帮助类
 * 使用参数化防注入，要注意查询的表内部如果有空值，一定要在参数化之前的时候，写入{参数 ?? DBnull.value}
 * */


public static class DBHelper
{
    private static readonly string connStr = ConfigurationManager.ConnectionStrings["Connection"].ToString();
    /// <summary>
    /// 执行添加、删除、修改的通用方法
    /// </summary>
    /// <param name="sql">SQL脚本</param>
    /// <param name="paras">可选的sql脚本参数</param>
    /// <returns>返回受影响行数</returns>
    public static int ExecuteNonQuery(string sql, CommandType type, params SqlParameter[] paras)
    {
        int result = -1;
        using (SqlConnection conn = new SqlConnection(connStr))
        {
            conn.Open();//打开连接;
            using (SqlCommand command = new SqlCommand(sql, conn))  //创建sql脚本
            {
                command.CommandType = type;
                if (paras != null)
                {
                    command.Parameters.AddRange(paras);//添加参数
                }
                result = command.ExecuteNonQuery();//执行脚本
                return result;
            }


        }//自动释放资源

    }
    /// <summary>
    /// 执行查询，返回结果集中的第一行第一列
    /// </summary>
    /// <param name="sql">SQL脚本</param>
    /// <param name="paras">可选的sql脚本参数</param>
    /// <returns>结果集中的第一行第一列</returns>
    public static object ExecuteScalar(string sql, CommandType type, params SqlParameter[] paras)
    {
        object result = null;
        using (SqlConnection conn = new SqlConnection(connStr))
        {
            using (SqlCommand command = new SqlCommand(sql, conn))
            {
                command.CommandType = type;
                if (paras != null)
                {
                    command.Parameters.AddRange(paras);//添加参数
                }
                conn.Open();//打开连接;
                return result = command.ExecuteScalar();//执行脚本
            }
            //创建sql脚本             
        }//自动释放资源
    }
    /// <summary>
    /// 执行查询返回多行多列 ，返回一个结果集；
    /// </summary>
    /// <param name="sql">SQL脚本</param>
    /// <param name="paras">可选的sql脚本参数</param>
    /// <returns>查询的结果集</returns>
    public static SqlDataReader ExecuteReader(string sql, params SqlParameter[] paras)
    {

        SqlConnection conn = new SqlConnection(connStr); //连接式的连接方式 ，和数据库实时保持连接状态
        conn.Open();//打开连接;
        SqlCommand command = new SqlCommand(sql, conn);//创建sql脚本
        command.Parameters.AddRange(paras);//添加参数
        SqlDataReader reader = command.ExecuteReader(CommandBehavior.CloseConnection);//执行脚本，使用完会自动关闭            
        return reader;
    }
    /// <summary>
    /// 执行查询，返回一张临时表；
    /// </summary>
    /// <param name="sql">SQL脚本</param>
    /// <param name="paras">可选的sql脚本参数</param>
    /// <returns>查询的临时表</returns>
    public static DataTable GetDataTable(string sql, CommandType type, params SqlParameter[] paras)
    {
        //断开式的连接，不需要显式的Open;
        DataTable dt = new DataTable();
        using (SqlConnection conn = new SqlConnection(connStr))
        {
            using (SqlCommand command = new SqlCommand(sql, conn))
            {
                command.CommandType = type;
                if (paras != null)
                {
                    command.Parameters.AddRange(paras);//添加参数
                }
                SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(command);//创建数据适配器
                sqlDataAdapter.Fill(dt);
            }
        }//自动释放资源
        return dt;
    }

}

