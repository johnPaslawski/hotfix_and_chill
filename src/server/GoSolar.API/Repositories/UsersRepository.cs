using GoSolar.API.Models;

namespace GoSolar.API.Repositories
{
    public class UsersRepository
    {
        public static UsersRepository CurrentInstance { get; } = new UsersRepository();

        public IEnumerable<User> Users { get; set; } = new List<User>()
        {
            new User
            {
                Id = 1,
                Username = "user1@mail.com",
                Password = "admin"
            },
            new User
            {
                Id = 2,
                Username = "user2@mail.com",
                Password = "admin"
            },
            new User
            {
                Id = 3,
                Username = "user3@mail.com",
                Password = "admin"
            },
            new User
            {
                Id = 4,
                Username = "user4@mail.com",
                Password = "admin"
            },
            new User
            {
                Id = 5,
                Username = "user5@mail.com",
                Password = "admin"
            }
        };
    }
}
