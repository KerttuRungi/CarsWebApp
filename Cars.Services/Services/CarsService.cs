using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Cars.Core.Dtos;
using Cars.Core.Interfaces;
using Cars.Data;
using Cars.Core.Entities;

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
    }
}
