using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspnetCoreAng2.Models
{
    public class PlanBase
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LOB { get; set; }
        public bool IsPlanValidated { get; set; }
        public DateTime? OpportunityDate { get; set; }
        public int Year { get; set; }
        public string ProductType { get; set; }
    }
}
