using Microsoft.AspNetCore.Mvc;

namespace CarsWebApp.Models
{
    public class CarsViewModel
    {
        public Guid? Id { get; set; }
        public string? Brand { get; set; }
        public string? Color { get; set; }
        public string? Model { get; set; }
        public int? Year { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
    }
}
