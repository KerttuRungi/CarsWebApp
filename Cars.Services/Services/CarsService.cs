using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cars.Core.Dtos;
using Cars.Core.Interfaces;
using Cars.Data;
using Cars.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Cars.ApplicationServices.Services
{
    public class CarsService : ICarsService
    {
        private readonly CarsDatabaseContext _context;

        public CarsService
            (
                CarsDatabaseContext context
            )
        {
            _context = context;
        }
        public async Task<CarsDto> CreateAsync(CarsDto dto)
        {
            Car cars = new Car();

            cars.Id = Guid.NewGuid();
            cars.Brand = dto.Brand;
            cars.Color = dto.Color;
            cars.Model = dto.Model;
            cars.Year = dto.Year;
            cars.CreatedAt = DateTime.Now;
            cars.ModifiedAt = DateTime.Now;

            await _context.Cars.AddAsync(cars);
            await _context.SaveChangesAsync();

            return new CarsDto
            {
                Id = cars.Id,
                Brand = cars.Brand,
                Color = cars.Color,
                Model = cars.Model,
                Year = cars.Year,
                CreatedAt = DateTime.Now,
                ModifiedAt = DateTime.Now,
            };

        }
        public async Task<CarsDto> UpdateAsync(CarsDto dto)
        {
            var car = await _context.Cars.FindAsync(dto.Id);

            if (car == null)
            {
                throw new Exception("Car not found");
            }

            car.Brand = dto.Brand;
            car.Color = dto.Color;
            car.Model = dto.Model;
            car.Year = dto.Year;
            car.ModifiedAt = DateTime.Now;
            _context.Cars.Update(car);
            await _context.SaveChangesAsync();

            return new CarsDto
            {
                Id = car.Id,
                Brand = car.Brand,
                Color = car.Color,
                Model = car.Model,
                Year = car.Year,
                CreatedAt = car.CreatedAt,
                ModifiedAt = DateTime.Now,
            };
        }
        public async Task<CarsDto> DeleteAsync(CarsDto dto)
        {
            var car = await _context.Cars
                .FirstOrDefaultAsync(c => c.Id == dto.Id);

            if (car == null)
            {
                return null;
            }
            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();
            return new CarsDto
            {
                Id = car.Id,
                Brand = car.Brand,
                Color = car.Color,
                Model = car.Model,
                Year = car.Year,
                CreatedAt = car.CreatedAt,
                ModifiedAt = car.ModifiedAt,
            };
        }

        public async Task<IEnumerable<CarsDto>> GetAll()
        {
            return await _context.Cars
                 .Select(c => new CarsDto
                 {
                     Id = c.Id,
                     Brand = c.Brand,
                     Color = c.Color,
                     Model = c.Model,
                     Year = c.Year,
                 })
                 .ToListAsync();
        }

        public async Task<IEnumerable<CarsDto>> DetailAsync(Guid Id)
        {
            return await _context.Cars
                 .Where(c => c.Id == Id)
                 .Select(c => new CarsDto
                 {
                     Id = c.Id,
                     Brand = c.Brand,
                     Color = c.Color,
                     Model = c.Model,
                     Year = c.Year,
                 })
                 .ToListAsync();
        }
    }
}
