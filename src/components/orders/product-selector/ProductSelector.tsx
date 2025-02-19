
import { useState, useRef, useEffect } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
}

interface ProductSelectorProps {
  selectedProducts: Product[];
  onProductsChange: (products: Product[]) => void;
}

export const ProductSelector = ({
  selectedProducts,
  onProductsChange
}: ProductSelectorProps) => {
  const [commandOpen, setCommandOpen] = useState(false);
  const [search, setSearch] = useState("");
  const commandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commandRef.current && !commandRef.current.contains(event.target as Node)) {
        setCommandOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, category')
        .order('category', { ascending: true });
      
      if (error) throw error;
      return data || [];
    }
  });

  const filteredProducts = products?.filter(product => 
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const category = product.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div ref={commandRef} className="relative">
      <div 
        onClick={() => setCommandOpen(true)}
        className="min-h-[40px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm flex flex-wrap gap-1.5 items-center cursor-text"
      >
        {selectedProducts.map((product) => (
          <span 
            key={product.id}
            className="inline-flex items-center gap-1 bg-secondary px-2 py-1 rounded-md text-sm"
          >
            {product.name}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onProductsChange(selectedProducts.filter(p => p.id !== product.id));
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        {selectedProducts.length === 0 && (
          <span className="text-muted-foreground">Select products...</span>
        )}
      </div>
      {commandOpen && (
        <Command className="absolute w-full mt-1 rounded-md border shadow-md z-50 bg-white">
          <CommandInput 
            placeholder="Search products..." 
            value={search}
            onValueChange={setSearch}
            className="border-none focus:ring-0"
          />
          <CommandList className="max-h-[300px] overflow-auto">
            <CommandEmpty>No products found.</CommandEmpty>
            {!isLoading && Object.entries(groupedProducts).map(([category, categoryProducts]) => (
              <CommandGroup key={category} heading={category}>
                {categoryProducts.map((product) => (
                  <CommandItem
                    key={product.id}
                    onSelect={() => {
                      const isSelected = selectedProducts.some(p => p.id === product.id);
                      if (isSelected) {
                        onProductsChange(selectedProducts.filter(p => p.id !== product.id));
                      } else {
                        onProductsChange([...selectedProducts, product]);
                      }
                    }}
                    className="flex items-center gap-2"
                  >
                    <Checkbox 
                      checked={selectedProducts.some(p => p.id === product.id)}
                      className="pointer-events-none"
                    />
                    <span>{product.name} - {product.price}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      )}
    </div>
  );
};
