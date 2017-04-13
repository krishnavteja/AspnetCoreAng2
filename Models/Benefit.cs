using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspnetCoreAng2.Models
{
    public class Benefit
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Decimal Copay { get; set; }
        public Decimal Coinsurance { get; set; }
    }
}
