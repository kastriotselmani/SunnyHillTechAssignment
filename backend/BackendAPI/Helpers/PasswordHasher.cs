using Konscious.Security.Cryptography;
using System.Security.Cryptography;
using System.Text;


namespace BackendAPI.Helpers
{
    public class PasswordHasher : IPasswordHasher
    {/// <summary>
     /// Hashes a password using Argon2id.
     /// </summary>
        public string HashPassword(string password)
        {
            // Generate a 16-byte random salt
            byte[] salt = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            // Convert the password to bytes
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);

            // Initialize Argon2id with the password bytes
            var argon2 = new Argon2id(passwordBytes)
            {
                Salt = salt,
                DegreeOfParallelism = 8, // number of threads to use
                Iterations = 4,          // number of iterations
                MemorySize = 1024 * 64   // 64 MB memory usage
            };

            // Get a 16-byte hash
            byte[] hash = argon2.GetBytes(16);

            // Combine the salt and hash into one byte array for storage
            byte[] hashBytes = new byte[salt.Length + hash.Length];
            Buffer.BlockCopy(salt, 0, hashBytes, 0, salt.Length);
            Buffer.BlockCopy(hash, 0, hashBytes, salt.Length, hash.Length);

            // Return the combined salt+hash as a Base64 string
            return Convert.ToBase64String(hashBytes);
        }

        /// <summary>
        /// Verifies a provided password against the stored hash.
        /// </summary>
        public bool VerifyPassword(string hashedPassword, string providedPassword)
        {
            // Convert the stored Base64 string to a byte array
            byte[] hashBytes = Convert.FromBase64String(hashedPassword);

            // Extract the salt (first 16 bytes)
            byte[] salt = new byte[16];
            Buffer.BlockCopy(hashBytes, 0, salt, 0, salt.Length);

            // Convert the provided password to bytes
            byte[] providedPasswordBytes = Encoding.UTF8.GetBytes(providedPassword);

            // Initialize Argon2id with the provided password bytes and the extracted salt
            var argon2 = new Argon2id(providedPasswordBytes)
            {
                Salt = salt,
                DegreeOfParallelism = 8,
                Iterations = 4,
                MemorySize = 1024 * 64
            };

            // Compute the hash for the provided password
            byte[] computedHash = argon2.GetBytes(16);

            // Compare the computed hash with the stored hash
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (hashBytes[i + salt.Length] != computedHash[i])
                {
                    return false;
                }
            }
            return true;
        }
    }
}
