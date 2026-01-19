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

        //Update
        [HttpPut]
        public async Task<IActionResult> Update(Guid Id,[FromBody] CarsDto dto)
        {
            dto.Id = Id;
            var result = await _carsService.UpdateAsync(dto);

            if (result == null)
                return BadRequest("Could not update a car");

            return Ok(result);
        }

        //Delete
        [HttpDelete("{Id:guid}")]
        public async Task<IActionResult> DeleteAsync(Guid Id,[FromBody] CarsDto dto)
        {
            dto.Id = Id;
            var deleted = await _carsService.DeleteAsync(dto);

            if (deleted == null)
                return NotFound(new { message = "Car not found." });
            return Ok(deleted);
        }

    }
}
