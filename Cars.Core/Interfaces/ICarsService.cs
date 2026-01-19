using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cars.Core.Dtos;
using Cars.Core.Entities;

namespace Cars.Core.Interfaces
{
    public interface ICarsService
    {
        Task<IEnumerable<CarsDto>> GetAll();
        Task<CarsDto> CreateAsync(CarsDto dto);
        Task<CarsDto> UpdateAsync(CarsDto dto);
        Task<CarsDto> DeleteAsync(CarsDto dto);
    }
}
