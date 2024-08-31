pub type Rule =
  fn(String) -> Result(Nil, List(Violation))

pub type Violation {
  Violation(span: #(Int, Int))
}
