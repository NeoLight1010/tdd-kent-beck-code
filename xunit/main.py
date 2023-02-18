class WasRun:
    def __init__(self, name: str) -> None:
        self.was_run = None

    def test_method(self) -> None:
        pass

test = WasRun("test_method")
print(test.was_run)
test.test_method()
print(test.was_run)
