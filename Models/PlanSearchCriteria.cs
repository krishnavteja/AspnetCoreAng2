using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspnetCoreAng2.Models
{
    public class PlanSearchCriteria
    {
        public int Id { get; set; }
        public int Year { get; set; }
        public int LOBId { get; set; }
        public string Name { get; set; }
        public int ProductTypeId { get; set; }
        public string SearchTerm { get; set; }
    }
}
