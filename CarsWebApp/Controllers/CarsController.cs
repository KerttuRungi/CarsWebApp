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

        //GET all
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var cars = await _carsService.GetAll();

            return Ok(cars);
        }
        //GET by Id
        [HttpGet("{Id:guid}")]
        public async Task<IActionResult> GetById(Guid Id)
        {
            var cars = await _carsService.DetailAsync(Id);

            return Ok(cars);
        }

        //Create
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CarsDto dto)
        {
            var result = await _carsService.CreateAsync(dto);

            if (result == null)
                return BadRequest("Could not create a car");

            return Ok(result);
        }
    }
}
