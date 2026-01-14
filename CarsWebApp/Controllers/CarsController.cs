using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Cars.Core.Entities;
using Cars.Data;
using Cars.Core.Interfaces;
using Cars.Core.Dtos;

namespace CarsWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly CarsDatabaseContext _context;
        private readonly ICarsService _carsService;

        public CarsController(CarsDatabaseContext context, ICarsService carsService)
        {
            _context = context;
            _carsService = carsService;
        }

    }
}
