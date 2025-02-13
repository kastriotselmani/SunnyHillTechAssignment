namespace BackendAPI.Models
{
    public class ServiceResult
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public string Data { get; set; }
        public string Token { get; set; }

        public ServiceResult(bool success, string message, string token)
        {
            Success = success;
            Message = message;
            Token = token;
            Data = null; 
        }

        public ServiceResult(bool success, string message, string data, string token)
        {
            Success = success;
            Message = message;
            Token = null;
            Data = data;
        }

        public ServiceResult(bool success, string message)
        {
            Success = success;
            Message = message;
            Token = null;
            Data = null;
        }
    }
}
