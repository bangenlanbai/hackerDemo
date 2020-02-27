using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Validate 的摘要说明
/// 随机类
/// </summary>
public class Validate
{
    public Validate()
    {
   
    }
   public static string result;
    public static string CreateValidateCode(int length, bool isNum = false, bool isChar = false)
    {
        string[] validateCode = { "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9" };
        Random r = new Random();
        int maxLength = validateCode.Length;
        int minLength = 0;
        if (isNum)
        {
            minLength = 26;
        }
        if (isChar)
        {
            maxLength = 26;
        }

        string res = "";
        for (int i = 0; i < length; i++)
        {
            res += validateCode[r.Next(minLength, maxLength)];
        }
        result = res;
        return res;
    }

}