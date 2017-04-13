using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspnetCoreAng2.Models
{
    public class Plan : PlanBase
    {
        public List<Benefit> PlanBenefits { get; set; } = new List<Benefit>();
    }
}
