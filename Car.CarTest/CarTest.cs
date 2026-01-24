using Microsoft.EntityFrameworkCore;
using Cars.ApplicationServices.Services;
using Cars.Data;
using Cars.Core.Dtos;

namespace Car.CarTest
{
    public class CarTest
    {
        private CarsService CreateService(string TestBase)
        {
            var options = new DbContextOptionsBuilder<CarsDatabaseContext>()
                .UseInMemoryDatabase(TestBase)
                .Options;

            var context = new CarsDatabaseContext(options);
            return new CarsService(context);
        }

        [Fact]
        public async Task CreateAsync_AddsCarToDatabase()
        {
            // Arrange  
            var service = CreateService(nameof(CreateAsync_AddsCarToDatabase));

            var dto = new CarsDto
            {
                Brand = "Fiat",
                Model = "500",
                Color = "Pink",
                Year = 2007
            };

            // Act  
            var result = await service.CreateAsync(dto);

            // Assert  
            Assert.NotNull(result);
            Assert.NotEqual(Guid.Empty, result.Id);
        }

        [Fact]
        public async Task DetailAsync_ReturnsCar_WhenIdExists()
        {
            // Arrange
            var service = CreateService(nameof(DetailAsync_ReturnsCar_WhenIdExists));

            var created = await service.CreateAsync(new CarsDto
            {
                Brand = "Toyota",
                Model = "Corolla",
                Color = "White",
                Year = 2018
            });

            // Act
            var result = await service.DetailAsync(created.Id.Value);

            // Assert
            var car = Assert.Single(result);
            Assert.Equal(created.Id, car.Id);
            Assert.Equal("Toyota", car.Brand);
        }

        [Fact]
        public async Task UpdateAsync_UpdatesCarDetails()
        {
            // Arrange
            var service = CreateService(nameof(UpdateAsync_UpdatesCarDetails));

            var created = await service.CreateAsync(new CarsDto
            {
                Brand = "Honda",
                Model = "Civic",
                Color = "Gray",
                Year = 2020
            });

            created.Color = "Purple";

            // Act
            var updated = await service.UpdateAsync(created);

            // Assert
            Assert.Equal("Purple", updated.Color);
        }

        [Fact]
        public async Task DeleteAsync_RemovesCarFromDatabase()
        {
            // Arrange
            var service = CreateService(nameof(DeleteAsync_RemovesCarFromDatabase));

            var created = await service.CreateAsync(new CarsDto
            {
                Brand = "Mini",
                Model = "Cooper"
            });

            // Act
            await service.DeleteAsync(new CarsDto { Id = created.Id });
            var cars = await service.GetAll();

            // Assert
            Assert.Empty(cars);
        }
    }
}